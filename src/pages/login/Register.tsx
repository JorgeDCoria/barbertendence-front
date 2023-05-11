const Register = () => {
  return (
    <div>
      <Grid
        container
        sx={{
          backgroundImage:
            "linear-gradient(to bottom, #1F6BB5 7.57%, #7F217D 70%)",
          height: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        {/* contenedor del formulario */}
        <Grid
          item
          xs={11}
          sm={8}
          md={6}
          lg={4}
          container
          direction={"column"}
          justifyContent={"space-around"}
          sx={{
            background: "white",
            height: "90vh",
            borderRadius: "16px",
            boxSizing: "border-box",
          }}
        >
          {/* contenedor de logo */}
          <Box>
            <Grid container>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  component="img"
                  sx={{
                    width: { xs: 250, sm: 350 },
                  }}
                  src={logo}
                ></Box>
              </Grid>

              {/* contenedor de los inputs */}
              <Grid
                item
                xs={12}
                padding={2}
                container
                gap={4}
                marginTop={4}
                justifyContent={"center"}
              >
                <Grid
                  item
                  xs={12}
                  lg={10}
                  container
                  alignItems={"center"}
                  justifyContent={{
                    xs: "center",
                    sm: "space-around",
                    lg: "space-between",
                  }}
                >
                  <PhoneAndroidOutlinedIcon fontSize="large" />
                  <FormControl sx={{ minWidth: { xs: 80, md: 120 } }}>
                    <InputLabel id="code">Code</InputLabel>
                    <Select labelId="code" id="code-select" label="Code">
                      <MenuItem>+54</MenuItem>
                      <MenuItem>+11</MenuItem>
                      <MenuItem>+381</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl sx={{ flexFlow: 1 }}>
                    {" "}
                    <TextField
                      name="number"
                      label="Numero sin codigo de area"
                      type="number"
                    ></TextField>
                  </FormControl>
                </Grid>
                {/* Numero telefono */}

                <Grid item xs={12} lg={10}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      width: "100%",
                    }}
                  >
                    {" "}
                    <LockOutlinedIcon fontSize="large" />
                    <TextField
                      required
                      id="input-password"
                      label="Password"
                      type="password"
                      name="password"
                      fullWidth
                      variant="outlined"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <VisibilityOutlinedIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>{" "}
                </Grid>
                <Grid item xs={10}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    color="primary"
                    size="large"
                  >
                    Ingresar
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Register;
