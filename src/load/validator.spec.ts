import { validate, ValidationError } from "./validator";
import { InputApp } from "../model/input/input-models";
import { AppShortcuts, AtomicShortcut } from "../model/internal/internal-models";
import { Modifiers } from "../model/internal/modifiers";

// todo: validate all lowercase
// todo: validate no spaces
// todo: base in supported list
// todo: the same keymap names per app
// todo: the same section names
// todo: the same shortcut names (in section?)
// todo: the same app bundle ids or names

describe("Throws validation errors", () => {
  it("Throws validation error if incorrect modifier", () => {
    expect(() => validate([generateInputAppWithShortcut({ shortcut: "abc+e" })])).toThrowError(
      new ValidationError("Modifier 'abc' doesn't exist")
    );
  });

  it("Throws validation error if there are whitespace in shortcut", () => {
    expect(() => validate([generateInputAppWithShortcut({ shortcut: "cmd +e" })])).toThrowError(
      new ValidationError("Invalid shortcut: 'cmd +e'")
    );
  });

  it.each([
      "opt+ctrl+e",
      "cmd+ctrl+e",
      "shift+ctrl+e",
      "opt+shift+e",
      "cmd+opt+e",
      "ctrl+shift+opt+cmd+e cmd+opt+e"
  ])("Throws validation error if modifiers are not in order %p", (shortcut: string) => {
    expect(() => validate([generateInputAppWithShortcut({ shortcut })])).toThrowError(
        new ValidationError(`Modifiers have incorrect order. Received: '${shortcut}'. Correct order: ctrl, shift, opt, cmd`)
    );
  });

  it.each([
    "ctrl+shift+opt+cmd+e",
    "ctrl+opt+cmd+e",
    "shift+opt+e",
    "ctrl+shift+e",
    "opt+cmd+e",
    "ctrl+cmd+e",
    "ctrl+shift+opt+e",
    "ctrl+shift+cmd+e",
    "ctrl+opt+cmd+e",
    "shift+opt+cmd+e",
    "ctrl+shift+opt+cmd+e ctrl+opt+cmd+e shift+opt+e ctrl+shift+e opt+cmd+e ctrl+cmd+e ctrl+shift+opt+e ctrl+shift+cmd+e ctrl+opt+cmd+e shift+opt+cmd+e",
  ])("Validation succeed if modifiers are in order %p", (shortcut: string) => {
    expect(() => validate([generateInputAppWithShortcut({ shortcut })])).not.toThrowError();
  });
});

function generateInputAppWithShortcut(override?: { shortcut: string }): InputApp {
  return {
    bundleId: "some-bundle-id",
    name: "some-name",
    keymaps: [
      {
        title: "keymap-name",
        sections: [
          {
            title: "section-name",
            shortcuts: [
              {
                title: "shortcut",
                key: override?.shortcut ?? "cmd+e",
              },
            ],
          },
        ],
      },
    ],
  };
}

function generateExpectedAppWithShortcut(override?: { shortcutSequence: AtomicShortcut[] }): AppShortcuts {
  return {
    bundleId: "some-bundle-id",
    name: "some-name",
    keymaps: [
      {
        title: "keymap-name",
        sections: [
          {
            title: "section-name",
            hotkeys: [
              {
                title: "shortcut",
                sequence: override?.shortcutSequence ?? [
                  {
                    base: "e",
                    modifiers: [Modifiers.command],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
}
