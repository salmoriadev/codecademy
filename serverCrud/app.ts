import express from "express";
import type { Request } from "express";
import {
  createElement,
  type Element,
  type ElementInput,
  type ElementType,
  getElementById,
  getIndexById,
  seedElements,
  updateElement,
} from "./utils.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use static server to serve the Express Yourself Website
app.use(express.static("public"));

const expressions: Element[] = [];
seedElements(expressions, "expressions");
const animals: Element[] = [];
seedElements(animals, "animals");

type UnknownRecord = Record<string, unknown>;

const isRecord = (value: unknown): value is UnknownRecord => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

const getPayload = (req: Request): UnknownRecord => {
  if (isRecord(req.body) && Object.keys(req.body).length > 0) {
    return req.body;
  }
  return req.query as UnknownRecord;
};

const toOptionalString = (value: unknown): string | undefined => {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    const first = value.find((item) => typeof item === "string");
    return typeof first === "string" ? first : undefined;
  }

  return undefined;
};

const parseElementInput = (payload: UnknownRecord): ElementInput | null => {
  const name = toOptionalString(payload.name);
  const emoji = toOptionalString(payload.emoji);

  if (!name || !emoji) {
    return null;
  }

  const trimmedName = name.trim();
  const trimmedEmoji = emoji.trim();

  if (!trimmedName || !trimmedEmoji) {
    return null;
  }

  return {
    name: trimmedName,
    emoji: trimmedEmoji,
  };
};

const parseElementUpdate = (
  payload: UnknownRecord,
): Partial<ElementInput> => {
  const updates: Partial<ElementInput> = {};
  const name = toOptionalString(payload.name);
  const emoji = toOptionalString(payload.emoji);

  if (name && name.trim()) {
    updates.name = name.trim();
  }

  if (emoji && emoji.trim()) {
    updates.emoji = emoji.trim();
  }

  return updates;
};

const parseIdParam = (idParam: string): number | null => {
  const id = Number(idParam);
  return Number.isFinite(id) ? id : null;
};

const registerCrudRoutes = (
  basePath: string,
  elementList: Element[],
  elementType: ElementType,
): void => {
  app.get(`/${basePath}`, (req, res) => {
    res.send(elementList);
  });

  app.get(`/${basePath}/:id`, (req, res) => {
    const id = parseIdParam(req.params.id);
    if (id === null) {
      res.status(404).send();
      return;
    }

    const element = getElementById(id, elementList);
    if (element) {
      res.send(element);
    } else {
      res.status(404).send();
    }
  });

  app.post(`/${basePath}`, (req, res) => {
    const payload = getPayload(req);
    const input = parseElementInput(payload);

    if (!input) {
      res.status(400).send();
      return;
    }

    const createdElement = createElement(elementType, input);
    elementList.push(createdElement);
    res.status(201).send(createdElement);
  });

  app.put(`/${basePath}/:id`, (req, res) => {
    const id = parseIdParam(req.params.id);
    if (id === null) {
      res.status(404).send();
      return;
    }

    const payload = getPayload(req);
    const updates = parseElementUpdate(payload);
    const updatedElement = updateElement(id, updates, elementList);

    if (!updatedElement) {
      res.status(404).send();
      return;
    }

    res.send(updatedElement);
  });

  app.delete(`/${basePath}/:id`, (req, res) => {
    const id = parseIdParam(req.params.id);
    if (id === null) {
      res.status(404).send();
      return;
    }

    const elementIndex = getIndexById(id, elementList);
    if (elementIndex !== -1) {
      elementList.splice(elementIndex, 1);
      res.status(204).send();
    } else {
      res.status(404).send();
    }
  });
};

registerCrudRoutes("expressions", expressions, "expressions");
registerCrudRoutes("animals", animals, "animals");

export { app };
