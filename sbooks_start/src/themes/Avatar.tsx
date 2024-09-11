import Avatar from "@mui/material/Avatar";

declare module "@mui/material/styles" {
  interface Theme {
    avatar: Record<string, string>;
  }

  interface ThemeOptions {
    avatar?: Record<string, string>;
  }
}

declare module "@mui/material/Avatar" {
  interface AvatarPropsVariantOverrides {
    roundedXL: true;
    roundedLG:true;
    roundedMD:true;
    RoundedRegular:true;
    RoundedSM:true;
    roundedXLActive:true;
    roundedLGActive:true;
    roundedMDActive:true;
    roundedRegularActive:true;
    roundedSMActive:true;
    PlaceRoundedXL:true;
    PlaceRoundedLG:true;
    PlaceRoundedMD:true;
    PlaceRoundedRegular:true;
    PlaceRoundedSM:true;
    circleXL:true;
    circleLG:true;
    circleMD:true;
    circleSM:true;
    circleXLActive:true;
    circleLGActive:true;
    circleMDActive:true;
    circleRegularActive:true;
    circleSMActive:true;
    PlaceCircleXL:true;
    PlaceCircleLG:true;
    PlaceCircleMD: true;
    PlaceCircleRegular:true;
    PlaceCircleSM:true;
  }
}

const avatar = [
  {
    props: { variant: "roundedXL" as any },
    style: {
      width: "144px",
      height: "144px",
      flexShrink: 0,
      borderRadius: "4px",
      // color: "red",
      // backgroundColor: "red",
    },
  },
  {
    props: { variant: "roundedLG" as any },
    style: {
      width: "80px",
      height: "80px",
      flexShrink: 0,
      borderRadius: "4px",
    },
  },
  {
    props: { variant: "roundedMD" as any },
    style: {
      width: "48px",
      height: "48px",
      flexShrink: 0,
      borderRadius: "4px",
    },
  },
  {
    props: { variant: "RoundedRegular" as any },
    style: {
      width: "32px",
      height: "32px",
      flexShrink: 0,
      borderRadius: "4px",
    },
  },
  {
    props: { variant: "RoundedSM  " as any },
    style: {
      width: "24x",
      height: "24px",
      flexShrink: 0,
      borderRadius: "4px",
    },
  },
  {
    props: { variant: "roundedXLActive" as any },
    style: {
      width: "144Px",
      height: "144px",
      flexShrink: 0,
      borderRadius: "8px",
      display: "flex",
      padding: "0px 0px 124px 124px",
      justifyContent: "flex-end",
      AlignItems: "center",
    },
  },
  {
    props: { variant: "roundedLGActive  " as any },
    style: {
      width: "80px",
      height: "80px",
      flexShrink: 0,
      borderRadius: "8px",
      display: "flex",
      padding: "0px 0px 65px 65px",
      justifyContent: "flex-end",
      AlignItems: "center",
    },
  },
  {
    props: { variant: "roundedMDActive  " as any },
    style: {
      width: "48px",
      height: "48px",
      flexShrink: 0,
      borderRadius: "8px",
      display: "flex",
      padding: "0px 0px 36px 36px",
      justifyContent: "flex-end",
      AlignItems: "center",
    },
  },
  {
    props: { variant: "roundedRegularActive  " as any },
    style: {
      width: "32px",
      height: "32px",
      flexShrink: 0,
      borderRadius: "8px",
      display: "flex",
      AlignItems: "center",
      gap: "10px",
    },
  },
  {
    props: { variant: "roundedSMActive  " as any },
    style: {
      width: "24px",
      height: "24px",
      flexShrink: 0,
      borderRadius: "8px",
      display: "flex",
      AlignItems: "flex-start",
      gap: "10px",
    },
  },
  {
    props: { variant: "PlaceRoundedXL" as any },
    style: {
      display: "flex",
      width: "144px",
      height: "144px",
      flexDirections: "column",
      justifyContent: "center",
      AlignItems: "center",
      gap: "10px",
      flexShrink: 0,
      borderRadius: "8px",
    },
  },
  {
    props: { variant: "PlaceRoundedLG" as any },
    style: {
      display: "flex",
      width: "80px",
      height: "80px",
      flexDirections: "column",
      justifyContent: "center",
      AlignItems: "center",
      gap: "10px",
      flexShrink: 0,
      borderRadius: "8px",
    },
  },
  {
    props: { variant: "PlaceRoundedMD" as any },
    style: {
      display: "flex",
      width: "48px",
      height: "48px",
      flexDirections: "column",
      justifyContent: "center",
      AlignItems: "center",
      gap: "10px",
      flexShrink: 0,
      borderRadius: "8px",
    },
  },
  {
    props: { variant: "PlaceRoundedRegular" as any },
    style: {
      display: "flex",
      width: "32px",
      height: "32px",
      flexDirections: "column",
      justifyContent: "center",
      AlignItems: "center",
      gap: "10px",
      flexShrink: 0,
      borderRadius: "8px",
    },
  },
  {
    props: { variant: "PlaceRoundedSM" as any },
    style: {
      display: "flex",
      width: "24px",
      height: "24px",
      flexDirections: "column",
      justifyContent: "center",
      AlignItems: "center",
      gap: "10px",
      flexShrink: 0,
      borderRadius: "8px",
    },
  },

  {
    props: { variant: "circleXL" as any },
    style: {
      width: "144px",
      height: "144px",
      flexShrink: 0,
      borderRadius: "100px",
    },
  },
  {
    props: { variant: "circleLG" as any },
    style: {
      width: "80px",
      height: "80px",
      flexShrink: 0,
      borderRadius: "100px",
    },
  },
  {
    props: { variant: "circleMD" as any },
    style: {
      width: "48px",
      height: "48px",
      flexShrink: 0,
      borderRadius: "100px",
    },
  },
  {
    props: { variant: "circleSM" as any },
    style: {
      width: "24px",
      height: "24px",
      flexShrink: 0,
      borderRadius: "100px",
    },
  },
  {
    props: { variant: "circleXLActive  " as any },
    style: {
      display: "flex",
      width: "144px",
      height: "144px",
      padding: "0px 14px 116px 102px",
      justifyContent: "flex-end",
      AlignItems: "center",
      flexShrink: 0,
      borderRadius: "100px",
    },
  },
  {
    props: { variant: "circleLGActive  " as any },
    style: {
      display: "flex",
      width: "80px",
      height: "80px",
      padding: "0px 2px 60px 58px",
      justifyContent: "flex-end",
      AlignItems: "center",
      flexShrink: 0,
      borderRadius: "100px",
    },
  },
  {
    props: { variant: "circleMDActive  " as any },
    style: {
      display: "flex",
      width: "48px",
      height: "48px",
      padding: "0px 0px 32px 36px",
      justifyContent: "flex-end",
      AlignItems: "center",
      flexShrink: 0,
      borderRadius: "100px",
    },
  },
  {
    props: { variant: "circleRegularActive  " as any },
    style: {
      display: "flex",
      width: "32px",
      height: "32px",
      AlignItems: "flex-start",
      gap: "10px",
      flexShrink: 0,
      borderRadius: "100px",
    },
  },
  {
    props: { variant: "circleSMActive  " as any },
    style: {
      display: "flex",
      width: "24px",
      height: "24px",
      AlignItems: "flex-start",
      gap: "10px",
      flexShrink: 0,
      borderRadius: "100px",
    },
  },

  {
    props: { variant: "PlaceCircleXL" as any },
    style: {
      display: "flex",
      width: "144px",
      height: "144px",
      flexDirections: "column",
      justifyContent: "center",
      AlignItems: "center",
      gap: "10px",
      flexShrink: 0,
      borderRadius: "999px",
    },
  },
  {
    props: { variant: "PlaceCircleLG" as any },
    style: {
      display: "flex",
      width: "80px",
      height: "80px",
      flexDirections: "column",
      justifyContent: "center",
      AlignItems: "center",
      gap: "10px",
      flexShrink: 0,
      borderRadius: "999px",
    },
  },
  {
    props: { variant: "PlaceCircleMD" as any },
    style: {
      display: "flex",
      width: "48px",
      height: "48px",
      flexDirections: "column",
      justifyContent: "center",
      AlignItems: "center",
      gap: "10px",
      flexShrink: 0,
      borderRadius: "999px",
    },
  },
  {
    props: { variant: "PlaceCircleRegular" as any },
    style: {
      display: "flex",
      width: "32px",
      height: "32px",
      flexDirections: "column",
      justifyContent: "center",
      AlignItems: "center",
      gap: "10px",
      flexShrink: 0,
      borderRadius: "999px",
    },
  },
  {
    props: { variant: "PlaceCircleSM" as any },
    style: {
      display: "flex",
      width: "24px",
      height: "24px",
      flexDirections: "column",
      justifyContent: "center",
      AlignItems: "center",
      gap: "10px",
      flexShrink: 0,
      borderRadius: "999px",
    },
  },
];

export default avatar;
