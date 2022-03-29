import Head from "next/head";
import DeviceDetector from "device-detector-js";
import { GetServerSideProps } from "next";

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily:"Roboto"
  },
}));
export default function Home({ device, result }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Head>
        <title>Meu dispositivo</title>
      </Head>
      <p>
        ip: <b>{result.query}</b>
      </p>
      <p>provedor: {result.isp}</p>
      <p>organização: {result.org}</p>
      <p>sistema autônomo: {result.as}</p>
      <p>
        região: {result.city}, {result.regionName}, {result.country}
      </p>
      <p>
        sistema operacional: {device.os.name} {device.os.version}
      </p>
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
      result
    },
  };
};
