export const downloadImage = async (imgUrl: string) => {
  const response = await fetch(imgUrl);
  if (!response.ok) return;
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  const filename = imgUrl.split("/").pop() || "downloaded-image.jpg";
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
