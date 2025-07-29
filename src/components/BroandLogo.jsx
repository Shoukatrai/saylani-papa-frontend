import { Box, Typography } from "@mui/material";

export function BrandLogo() {
  return (
    <Box display="flex" alignItems="center" gap={1}>
      <img
        src="/favicon.png"
        alt="Saylani PAPA Icon"
        style={{ width: 28, height: 28 }}
      />
      <Typography variant="h6" fontWeight={700}>
        <span style={{ color: "#0D47A1" }}>Saylani </span>
        <span style={{ color: "#2E7D32" }}>PAPA</span>
      </Typography>
    </Box>
  );
}
