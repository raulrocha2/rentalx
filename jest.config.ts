import { pathsToModuleNameMapper } from "ts-jest/utils";
import { compilerOptions } from "./tsconfig.json";

export default {
  bail: true,

  clearMocks: true,

  coverageProvider: "v8",

  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>/src/" }),

  preset: "ts-jest",

  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/modules/**/useCases/**/*.ts'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ["lcov", "text-summary"],
  testMatch: ["**/*.spec.ts"],

};
