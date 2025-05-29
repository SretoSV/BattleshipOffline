import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

afterEach(() => {
    cleanup();
});

/*
npm install -D vitest
npm install -D @testing-library/react @testing-library/jest-dom
npm install -D @types/testing-library__jest-dom
npm install -D @testing-library/user-event
*/