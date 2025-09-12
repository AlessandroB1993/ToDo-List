const projectForm = document.querySelector<HTMLFormElement>(".project-form");
const projectModalContainer = document.querySelector<HTMLDivElement>(
  "#project-modal-container"
);

function closeModal(el: HTMLDivElement): void {
  if (!projectForm || !el) return;

  el.classList.remove("show");
  el?.classList.add("hidden");

  projectForm.reset();
}

function closeModalOverlay(e: MouseEvent): void {
  const modalOverlay = e.target as HTMLElement;
  if (!modalOverlay || !modalOverlay.classList.contains("modal-container"))
    return;
  modalOverlay.classList.remove("show");
  projectModalContainer?.classList.remove("show");
  projectModalContainer?.classList.add("hidden");

  // const target = e.target as HTMLElement;
  // const overlay = target.closest(".modal-container");
  // if (!overlay) return;

  // overlay.classList.remove("show");
}

function showModal() {
  if (!projectModalContainer) return;

  projectModalContainer.classList.remove("hidden");
  projectModalContainer.classList.add("show");
}

export { closeModal, closeModalOverlay, showModal };
