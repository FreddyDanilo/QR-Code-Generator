const chartQrCodeAPI =
  "https://chart.googleapis.com/chart?cht=qr&chs=480x480&chl=";

const form = document.querySelector("[data-form]");
const image = document.querySelector("[data-image]");

const downloadQrCode = (url) => {
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.click();
};

const generateQrCode = async (content) => {
  const url = chartQrCodeAPI + encodeURI(content);
  try {
    const qrCode = await fetch(url);

    image.classList.contains("hidden") && image.classList.remove("hidden");

    downloadQrCode(url);

    return qrCode.url;
  } catch (error) {
    alert("Ups! Try again!");
  }
};

form.onsubmit = async (event) => {
  event.preventDefault();

  const content = new FormData(event.target).get("content");

  image.src = await generateQrCode(content);

  form.reset();
};
