import { Action, ActionPanel, List, useNavigation } from "@raycast/api";
import AppShortcuts from "./app-shortcuts";
import useShortcutsProvider from "./load/shortcuts-provider";

export default function AllShortcutsCommand() {
  const { push } = useNavigation();
  const shortcutsProvider = useShortcutsProvider();
  return (
    <List>
      {shortcutsProvider.getCachedShortcuts().applications.map((application) => {
        return (
          <List.Item
            icon="list-icon.png"
            key={application.bundleId}
            title={application.name}
            subtitle={application.bundleId}
            actions={
              <ActionPanel>
                <Action
                  title="Apply"
                  onAction={() => {
                    push(<AppShortcuts bundleId={application.bundleId} />);
                  }}
                />
              </ActionPanel>
            }
          />
        );
      })}
    </List>
  );
}
