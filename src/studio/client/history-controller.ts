const parseRevision = (value: string | undefined): number | null => {
  if (!value || !/^\d+$/.test(value)) return null;
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed >= 0 ? parsed : null;
};

const parseVersionNumber = (value: string | undefined): number | null => {
  if (!value || !/^[1-9]\d*$/.test(value)) return null;
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) ? parsed : null;
};

export const setupHistoryController = (): void => {
  const root = document.querySelector<HTMLElement>("[data-history-root]");
  if (!root || root.dataset.historyReady === "true") return;

  const expectedRevision = parseRevision(root.dataset.historyRevision);
  const dialog = document.querySelector<HTMLDialogElement>("#history-restore-dialog");
  if (expectedRevision === null || !dialog) return;

  root.dataset.historyReady = "true";
  const versionLabel = dialog.querySelector<HTMLElement>("[data-history-dialog-version]");
  const status = dialog.querySelector<HTMLElement>("[data-history-restore-status]");
  const confirm = dialog.querySelector<HTMLButtonElement>("[data-history-confirm-restore]");
  const cancel = dialog.querySelector<HTMLButtonElement>("[data-history-cancel-restore]");
  let selectedVersion: number | null = null;
  let pending = false;

  root.querySelectorAll<HTMLButtonElement>("[data-history-restore]").forEach((button) => {
    button.addEventListener("click", () => {
      if (pending) return;
      const versionNumber = parseVersionNumber(button.dataset.versionNumber);
      if (versionNumber === null) return;
      selectedVersion = versionNumber;
      if (versionLabel)
        versionLabel.textContent = button.dataset.versionLabel ?? `v${versionNumber}`;
      if (status) status.textContent = "";
      dialog.showModal();
    });
  });

  cancel?.addEventListener("click", () => {
    if (!pending) dialog.close();
  });

  confirm?.addEventListener("click", async () => {
    if (pending || selectedVersion === null) return;
    pending = true;
    confirm.disabled = true;
    if (cancel) cancel.disabled = true;
    if (status) status.textContent = "Restaurando a versão para o rascunho…";

    try {
      const response = await fetch(`/api/admin/versions/${selectedVersion}/restore`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ expectedRevision }),
      });

      if (response.status === 409) {
        if (status) {
          status.textContent =
            "Conflito detectado: o rascunho mudou em outra sessão. Recarregue antes de restaurar.";
        }
        return;
      }

      if (!response.ok) {
        if (status)
          status.textContent = "Não foi possível restaurar esta versão. Nada foi alterado.";
        return;
      }

      const payload = (await response.json().catch(() => null)) as { revision?: unknown } | null;
      if (!Number.isInteger(payload?.revision) || Number(payload?.revision) < 0) {
        if (status) status.textContent = "A restauração respondeu sem uma revisão válida.";
        return;
      }

      window.location.assign("/admin/studio");
    } catch {
      if (status) status.textContent = "Falha de rede. Nada foi restaurado; tente novamente.";
    } finally {
      pending = false;
      confirm.disabled = false;
      if (cancel) cancel.disabled = false;
    }
  });
};
