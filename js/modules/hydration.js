import assignedImages from "../config/assigned-images-data.js";
import { updateImageGallery } from "./gallery-renderer.js";
import { loadAssignments } from "../util/storage.js";

export function renderAllAssignments() {
  Object.assign(assignedImages, loadAssignments());
  Object.entries(assignedImages).forEach(([email, images]) => {
    images.forEach((image) => {
      updateImageGallery({ email, image });
    });
  });
}