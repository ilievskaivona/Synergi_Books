import { createTheme } from "@mui/material/styles";
import avatar from "./Avatar";
import mobileTypography from "./MobileTypography";
import Palette from "./Palette";
import shadow from "./Shadows";
import Spacing from "./Spacing";
import Typography from "./Typography";

const theme = createTheme({
  palette: {
    ...Palette,
  } as any,
  customSpacing: Spacing.reduce((acc:any, value) => {
    acc[value.name] = value.px + "px";
    return acc;
  }, {}) as any,
  typography: {
    fontFamily: ["Plus Jakarta Sans", "sans-serif"].join(","),
    ...Typography,
    ...mobileTypography,
  } as any,
  shadows: Object.values(shadow) as any,
  // avatar: { ...avatar } as any,
  // avatar: { ...avatar } as any,
  components: {
    MuiMenu: {
      defaultProps: {
        elevation: 0,
      },
    },
    MuiAvatar: {
      variants: [
        // {
        //   props: { variant: "roundedXL" as any },
        //   style: {
        //     width: "144px",
        //     height: "144px",
        //     flexShrink: 0,
        //     borderRadius: "4px",
        //     color: "red",
        //     backgroundColor: "red",
        //   },
        // },
        // {
        //   props: { variant: "circleXL" as any },
        //   style: {
        //     width: "144px",
        //     height: "144px",
        //     flexShrink: 0,
        //     borderRadius: "100px",
        //   },
        // },
        ...avatar,
      ],
    },
  },
});
// Export the custom avatar styles separately
// export const customAvatarStyles = avatar;

export default theme;
