import { InputApp } from "../../model/input/input-models";

export const safariShortcuts: InputApp = {
    bundleId: "com.apple.Safari",
    name: "Safari",
    keymaps: [
        {
            title: "Default",
            sections: [
                {
                    title: "Bookmarks",
                    shortcuts: [
                        {
                            title: "Open Bookmarks Manager",
                            key: "opt+cmd+b",
                        },
                    ],
                },
                {
                    title: "Current Webpage",
                    shortcuts: [
                        {
                            title: "Search the current webpage",
                            key: "cmd+f",
                        },
                        {
                            title: "Select the Smart Search field",
                            key: "cmd+l",
                        },
                        {
                            title: "Print the current webpage",
                            key: "cmd+p",
                        },
                    ],
                },
                {
                    title: "Tabs",
                    shortcuts: [
                        {
                            title: "Show tab overview",
                            key: "shift+cmd+\\",
                        },
                        {
                            title: "Go to the next tab",
                            key: "ctrl+tab",
                        },
                        {
                            title: "Go to the previous tab",
                            key: "ctrl+shift+tab",
                        },
                    ],
                },
            ],
        },
    ],
};
