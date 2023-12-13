import TabLayout from "@/components/layouts/tab-layout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { loadHsrScannerDataString } from "../utils/user-data-utils";
import { HsrDataContext, defaultUserDataState } from "@/stores/database-store";
import { createRef, useContext, useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Trash2 } from "lucide-react";

function SettingsPage() {
  const { userData, setUserData } = useContext(HsrDataContext);
  const [firstRender, setFirstRender] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [importError, setImportError] = useState<boolean>(false);
  const textAreaRef = createRef<HTMLTextAreaElement>();

  useEffect(() => {
    if (!textAreaRef.current) return;
    textAreaRef.current.value =
      userData.source === "NONE"
        ? "No data imported."
        : JSON.stringify(userData, null, 2);
  }, [userData]);

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
      return;
    }
    if (!textAreaRef.current) return;
    if (!editMode) {
      if (!textAreaRef.current) return;
      setImportError(
        !loadHsrScannerDataString(textAreaRef.current.value, setUserData),
      );
    } else {
      setImportError(false);
      if (userData.source === "NONE") {
        textAreaRef.current.value = "";
      }
    }
  }, [editMode]);

  const importUserData = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const userData = e.target?.result as string;
          setImportError(!loadHsrScannerDataString(userData, setUserData));
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const exportUserData = () => {
    const dataStr = JSON.stringify(userData);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = `HSRExport_${new Date().toISOString()}.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const resetUserData = () => {
    setUserData(defaultUserDataState);
  };

  return (
    <TabLayout>
      <div className="flex w-full flex-col gap-2">
        <div className="text-2xl font-bold">Database</div>
        <div className="text-md h-fit rounded bg-gradient-to-b from-muted/50 to-muted p-4 font-semibold text-accent-foreground">
          This app currently only accepts JSON outputs from{" "}
          <a
            href="https://github.com/kel-z/HSR-Scanner/releases/latest"
            className="text-sky-400 underline hover:no-underline"
          >
            HSR-Scanner
          </a>
          . Download the latest release and follow the instructions there to get
          started.
        </div>
        <div className="flex gap-2">
          <Button onClick={importUserData}>Import</Button>
          <Button variant="secondary" onClick={exportUserData}>
            Export
          </Button>
          <Button variant="destructive" onClick={resetUserData}>
            <Trash2 size={20} />
          </Button>
        </div>

        <Separator />

        <Textarea
          ref={textAreaRef}
          className="h-[50vh] font-mono"
          readOnly={!editMode}
        />

        <div className="flex justify-between">
          <div className="text-sm text-red-500">
            {importError && "Invalid JSON. Changes were not saved."}
          </div>
          <Button variant="outline" onClick={() => setEditMode(!editMode)}>
            {editMode ? "Done" : "Edit"}
          </Button>
        </div>
      </div>
    </TabLayout>
  );
}

export default SettingsPage;
