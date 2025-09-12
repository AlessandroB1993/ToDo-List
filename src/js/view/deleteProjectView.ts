const modal = document.querySelector<HTMLDivElement>(
  "#delete-project-container"
);

function showDeleteProjectModal() {
  if (!modal) return;

  modal.classList.remove("hidden");
  modal.classList.add("show");
}

function closeModal(el: HTMLDivElement): void {
  if (!el) return;

  el.classList.remove("show");
  el.classList.add("hidden");
}

function closeModalOverlay(e: MouseEvent): void {
  const modalOverlay = e.target as HTMLElement;
  if (!modalOverlay || !modalOverlay.classList.contains("modal-container"))
    return;

  modalOverlay.classList.remove("show");

  modal?.classList.remove("show");
  modal?.classList.add("hidden");

  // const target = e.target as HTMLElement;
  // const overlay = target.closest(".modal-container");
  // if (!overlay) return;

  // overlay.classList.remove("show");
}

export { closeModal, closeModalOverlay, showDeleteProjectModal };
