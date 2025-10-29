export const getRotationStyle = (orientation?: string) => {
  switch (orientation) {
    case "portrait":
      return { transform: [{ rotate: "0deg" }] };
    case "portrait-upside-down":
      return { transform: [{ rotate: "180deg" }] };
    case "landscape-left":
      return { transform: [{ rotate: "270deg" }] };
    case "landscape-right":
      return { transform: [{ rotate: "90deg" }] };
    default:
      return { transform: [{ rotate: "0deg" }] };
  }
};
