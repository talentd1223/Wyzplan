import * as React from 'react';
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import IconButton from '@material-ui/core/IconButton';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Divider from "@material-ui/core/Divider";
import InputBase from '@material-ui/core/InputBase';
import DollarMask from "../masks/DollarMask";

function GlobalCard(): JSX.Element {
  return (
    <Card style={{ width: '33%', position: "relative" }} variant="outlined">
      <CardContent style={{ padding: 0 }} className="flex">
        <IconButton style={{ position: "absolute", left: 0, top: 0 }} aria-label="edit">
          <EditOutlinedIcon fontSize="small" />
        </IconButton>
        <div style={{ width: '100%', marginLeft: 46, marginTop: 12, marginRight: 12 }} className="flex">
          <div style={{ width: '100%' }}>
            <Typography variant="subtitle2">
              <b>Sole Proprietor</b>
            </Typography>
            <Divider style={{ marginTop: 4 }} />
            <div className="flex flex--align-center">
              <Typography variant="subtitle2" style={{ marginRight: 16, fontWeight: 'bold' }}>
                Value
              </Typography>
              <InputBase
                defaultValue="500000"
                // eslint-disable-next-line
                inputComponent={DollarMask as any}
                style={{ width: 83, height: 35, background: 'rgba(151, 151, 151, 0.1)', marginRight: 12 }}
                inputProps={{
                  style: { textAlign: 'center' }
                }}
              />
            </div>
          </div>
          <div style={{ width: '100%' }}>
            <Typography variant="subtitle2" style={{ whiteSpace: 'nowrap', fontWeight: 'bold' }}>
              Joint 30% Owned
            </Typography>
            <Divider style={{ marginTop: 4 }} />
            <div className="flex flex--align-center">
              <Typography variant="subtitle2" style={{ marginRight: 16, fontWeight: 'bold' }}>
                Debt
              </Typography>
              <InputBase
                defaultValue="100000"
                // eslint-disable-next-line
                inputComponent={DollarMask as any}
                style={{ width: 95, height: 35, background: 'rgba(151, 151, 151, 0.1)' }}
                inputProps={{
                  style: { textAlign: 'center' }
                }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default GlobalCard;
