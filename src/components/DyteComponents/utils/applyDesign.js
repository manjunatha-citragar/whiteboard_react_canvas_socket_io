import { provideDyteDesignSystem } from "@dytesdk/react-ui-kit";

const applyDesign = (el) => {
  provideDyteDesignSystem(el, {
    theme: "light",
    colors: {
      danger: "#f2294e",
      brand: {
        700: "#3172bd",
        600: "#1e5594",
        500: "#0e3d73",
        400: "#08284d",
        300: "#02152b",
      },
      text: "#071428",
      "text-on-brand": "#ffffff",
      "video-bg": "#E5E7EB",
    },
    borderRadius: "extra-rounded",
  });
};

export default applyDesign;
