import os
from PIL import Image
import numpy as np
from scipy.ndimage import binary_fill_holes, gaussian_filter, label

source_path = r"C:\Users\Admin\.gemini\antigravity-ide\brain\660e28b6-c55e-4c9b-b6d9-42e9421b4d1d\.user_uploaded\media_1792141267826.jpg"
target_dir = r"d:\Full-stack\First-Portfollio\public"
target_path = os.path.join(target_dir, "krish-portrait.png")

img = Image.open(source_path).convert("RGB")
w, h = img.size
arr = np.array(img, dtype=np.float32)

# Background reference sample
bg_sample = np.array([216.0, 219.0, 228.0], dtype=np.float32)
diff = np.sqrt(np.sum((arr - bg_sample) ** 2, axis=-1))

max_c = np.max(arr, axis=-1)
min_c = np.min(arr, axis=-1)
sat = np.where(max_c > 0, (max_c - min_c) / (max_c + 1e-5), 0)

# Detect border background
is_bg_seed = (diff < 36.0) & (sat < 0.12) & (arr[..., 0] > 190)

labeled_seeds, _ = label(is_bg_seed)
border_labels = set()
border_labels.update(np.unique(labeled_seeds[:8, :]))
border_labels.update(np.unique(labeled_seeds[-8:, :]))
border_labels.update(np.unique(labeled_seeds[:, :8]))
border_labels.update(np.unique(labeled_seeds[:, -8:]))
border_labels.discard(0)

bg_mask = np.isin(labeled_seeds, list(border_labels))
subject_mask = ~bg_mask

# Keep only the largest connected component of the subject (removes watermark star at bottom-right)
labeled_subject, num_subj = label(subject_mask)
if num_subj > 0:
    counts = np.bincount(labeled_subject.ravel())
    counts[0] = 0 # ignore background
    main_label = counts.argmax()
    subject_mask = (labeled_subject == main_label)

# Explicitly ensure bottom-right and bottom-left corner edge artifacts are zeroed out
subject_mask[920:, 950:] = False
subject_mask[920:, :50] = False

subject_mask = binary_fill_holes(subject_mask)

# Smooth edges
alpha_float = gaussian_filter(subject_mask.astype(np.float32), sigma=1.0)
alpha_channel = (np.clip(alpha_float, 0, 1) * 255).astype(np.uint8)

rgba = np.dstack([arr.astype(np.uint8), alpha_channel])
result_img = Image.fromarray(rgba, "RGBA")
result_img.save(target_path, "PNG")
print(f"Saved refined portrait to {target_path}")
