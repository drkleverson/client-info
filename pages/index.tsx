import Head from "next/head";
import DeviceDetector from "device-detector-js";
import { GetServerSideProps } from "next";

import { makeStyles } from "@material-ui/core/styles";
import { Box, Card, Grid, Typography, CardContent } from "@material-ui/core";
import { GiEarthAmerica } from "react-icons/gi";
import { MdDevices } from "react-icons/md";
import { FaNetworkWired, FaMapMarkerAlt } from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "Roboto",
  },
  icon: {
    marginRight: 5,
  }
}));

export default function Home({ device, result }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Head>
        <title>Meu dispositivo</title>
      </Head>
      <Grid container justify="center">
        <Card>
          <CardContent>
            <Box mb={1} alignItems="center" display="flex" flexWrap="wrap">
              <GiEarthAmerica className={classes.icon} />
              <Typography>
                <b>{result.query}</b>
              </Typography>
            </Box>
            <Box mb={1} alignItems="center" display="flex" flexWrap="wrap">
              <FaNetworkWired className={classes.icon} />
              <Typography>{result.isp}</Typography>
            </Box>
            <Box mb={1} alignItems="center" display="flex" flexWrap="wrap">
              <FaMapMarkerAlt className={classes.icon} />
              <Typography>
                {result.city}, {result.regionName}, {result.country}
              </Typography>
            </Box>
            <Box alignItems="center" display="flex" flexWrap="wrap">
              <MdDevices className={classes.icon} />
              <Typography>
                {device.os.name} {device.os.version}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = await fetch(
    `http://ip-api.com/json/${context.req.headers["x-real-ip"] || ""}`
  );
  const result = await response.json();

  const deviceDevice = new DeviceDetector();
  const device = deviceDevice.parse(context.req.headers["user-agent"]);
  return {
    props: {
      device,
      result,
    },
  };
};
