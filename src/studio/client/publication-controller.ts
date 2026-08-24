const parseRevision = (value: string | undefined): number | null => {
  if (!value || !/^\d+$/.test(value)) return null;
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed >= 0 ? parsed : null;
};

export const setupPublicationController = (): void => {
  const root = document.querySelector<HTMLElement>("[data-publication-root]");
  if (!root || root.dataset.publicationReady === "true") return;

  const expectedRevision = parseRevision(root.dataset.publicationRevision);
  const open = root.querySelector<HTMLButtonElement>("[data-publish-open]");
  const dialog = document.querySelector<HTMLDialogElement>("#publication-dialog");
  if (expectedRevision === null || !open || !dialog) return;

  root.dataset.publicationReady = "true";
  const confirm = dialog.querySelector<HTMLButtonElement>("[data-publication-confirm]");
  const cancel = dialog.querySelector<HTMLButtonElement>("[data-publication-cancel]");
  const status = dialog.querySelector<HTMLElement>("[data-publication-status]");
  let pending = false;

  open.addEventListener("click", () => {
    if (pending || open.disabled) return;
    if (status) status.textContent = "";
    dialog.showModal();
  });

  cancel?.addEventListener("click", () => {
    if (!pending) dialog.close();
  });

  confirm?.addEventListener("click", async () => {
    if (pending) return;
    pending = true;
    confirm.disabled = true;
    if (cancel) cancel.disabled = true;
    if (status) status.textContent = "Publicando nova versão…";

    try {
      const response = await fetch("/api/admin/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ expectedRevision }),
      });

      if (response.status === 409) {
        if (status) {
          status.textContent =
            "Conflito detectado: o rascunho mudou em outra sessão. Recarregue antes de publicar.";
        }
        return;
      }

      if (!response.ok) {
        if (status) status.textContent = "Não foi possível publicar. O site ao vivo não foi alterado.";
        return;
      }

      const payload = (await response.json().catch(() => null)) as {
        versionNumber?: unknown;
        revision?: unknown;
      } | null;
      if (!Number.isInteger(payload?.versionNumber) || !Number.isInteger(payload?.revision)) {
        if (status) status.textContent = "A publicação respondeu sem uma versão válida.";
        return;
      }

      window.location.reload();
    } catch {
      if (status) status.textContent = "Falha de rede. O site ao vivo não foi alterado; tente novamente.";
    } finally {
      pending = false;
      confirm.disabled = false;
      if (cancel) cancel.disabled = false;
    }
  });
};
