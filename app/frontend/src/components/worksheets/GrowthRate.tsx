import * as React from 'react';
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import IconButton from '@material-ui/core/IconButton';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Divider from "@material-ui/core/Divider";
import InputBase from "@material-ui/core/InputBase";
import PercentageMask from "../masks/PercentageMask";

function GrowthRate(): JSX.Element {
  return (
    <Card style={{ width: '33%', position: "relative", marginLeft: 16 }} variant="outlined">
      <CardContent style={{ padding: 0 }} className="flex">
        <IconButton style={{ position: "absolute", left: 0, top: 0 }} aria-label="edit">
          <EditOutlinedIcon fontSize="small" />
        </IconButton>
        <div style={{ width: '100%', marginLeft: 46, marginTop: 12, marginRight: 12 }} className="flex">
          <div style={{ width: '100%' }}>
            <Typography variant="subtitle2" style={{ fontWeight: 'bold' }}>
              Growth Rate
            </Typography>
            <Divider style={{ marginTop: 4 }} />
            <div className="flex flex--align-center">
              <InputBase
                // eslint-disable-next-line
                inputComponent={PercentageMask as any}
                defaultValue="35"
                style={{ width: 50, height: 35, background: 'rgba(151, 151, 151, 0.1)' }}
                inputProps={{
                  style: { textAlign: 'center' }
                }}
              />
              <Typography style={{ marginLeft: 8, marginRight: 8 }} variant="subtitle2">
                for
              </Typography>
              <InputBase
                defaultValue="4"
                style={{ width: 50, height: 35, background: 'rgba(151, 151, 151, 0.1)'  }}
                inputProps={{
                  style: { textAlign: 'center' }
                }}
              />
              <Typography style={{ marginLeft: 8, marginRight: 8 }} variant="subtitle2">
                years
              </Typography>
              <Divider style={{ marginTop: 4, marginBottom: 4 }} orientation="vertical" flexItem />
              <InputBase
                // eslint-disable-next-line
                inputComponent={PercentageMask as any}
                defaultValue="50"
                style={{ width: 50, height: 35, background: 'rgba(151, 151, 151, 0.1)', marginLeft: 8 }}
                inputProps={{
                  style: { textAlign: 'center' }
                }}
              />
              <Typography style={{ marginLeft: 8, marginRight: 8 }} variant="subtitle2">
                after
              </Typography>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default GrowthRate;
