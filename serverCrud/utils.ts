export type ElementType = "expressions" | "animals";

export interface Element {
  id: number;
  emoji: string;
  name: string;
}

export interface ElementInput {
  emoji: string;
  name: string;
}

let expressionIdCounter = 0;
let animalIdCounter = 0;

const nextId = (elementType: ElementType): number => {
  if (elementType === "expressions") {
    expressionIdCounter += 1;
    return expressionIdCounter;
  }

  animalIdCounter += 1;
  return animalIdCounter;
};

export const getElementById = (
  id: number,
  elementList: Element[],
): Element | undefined => {
  return elementList.find((element) => element.id === id);
};

export const getIndexById = (id: number, elementList: Element[]): number => {
  return elementList.findIndex((element) => element.id === id);
};

export const createElement = (
  elementType: ElementType,
  payload: ElementInput,
): Element => {
  const currentId = nextId(elementType);
  return {
    id: currentId,
    emoji: payload.emoji,
    name: payload.name,
  };
};

export const updateElement = (
  id: number,
  updates: Partial<ElementInput>,
  elementList: Element[],
): Element | undefined => {
  const element = getElementById(id, elementList);
  if (!element) {
    return undefined;
  }

  if (updates.emoji !== undefined) {
    element.emoji = updates.emoji;
  }

  if (updates.name !== undefined) {
    element.name = updates.name;
  }

  return element;
};

export const seedElements = (arr: Element[], type: ElementType): void => {
  if (type === "expressions") {
    arr.push(createElement("expressions", { emoji: "😀", name: "happy" }));
    arr.push(createElement("expressions", { emoji: "😎", name: "shades" }));
    arr.push(createElement("expressions", { emoji: "😴", name: "sleepy" }));
    return;
  }

  if (type === "animals") {
    arr.push(createElement("animals", { emoji: "🐶", name: "Pupper" }));
    arr.push(createElement("animals", { emoji: "🐍", name: "Snek" }));
    arr.push(createElement("animals", { emoji: "🐱", name: "Maru" }));
    return;
  }

  throw new Error("seed type must be either 'expressions' or 'animals'");
};
