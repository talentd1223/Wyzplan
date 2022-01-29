import * as React from 'react';
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import IconButton from '@material-ui/core/IconButton';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Divider from "@material-ui/core/Divider";
import InputBase from '@material-ui/core/InputBase';
import {useSetRecoilState} from "recoil";
import PercentageMask from "../../masks/PercentageMask";
import {retirementDialogActive} from "../../../store/Atoms";

function RetirementCard(): JSX.Element {
  const setOpen = useSetRecoilState(retirementDialogActive);

  return (
    <Card style={{ position: "relative", marginRight: 12 }} variant="outlined">
      <CardContent style={{ padding: 0 }} className="flex">
        <IconButton onClick={() => setOpen(true)} style={{ position: "absolute", left: 0, top: 0 }} aria-label="edit">
          <EditOutlinedIcon fontSize="small" />
        </IconButton>
        <div style={{ width: '100%', marginLeft: 46, marginTop: 12, marginRight: 12 }} className="flex">
          <div style={{ width: '100%' }}>
            <Typography variant="subtitle2">
              <b>Retirement</b>
            </Typography>
            <Divider style={{ marginTop: 4 }} />
            <div className="flex flex--align-center">
              <Typography variant="subtitle2" style={{ marginRight: 16, fontWeight: 'bold', width: 80 }}>
                2021
              </Typography>
              <InputBase
                defaultValue="5"
                // eslint-disable-next-line
                inputComponent={PercentageMask as any}
                style={{ width: 50, height: 35, background: 'rgba(151, 151, 151, 0.1)', marginLeft: 12 }}
                inputProps={{
                  style: { textAlign: 'center' }
                }}
              />
            </div>
            <div className="flex flex--align-center">
              <Typography variant="subtitle2" style={{ marginRight: 16, fontWeight: 'bold', width: 80  }}>
                2021 - 2024
              </Typography>
              <InputBase
                defaultValue="12"
                // eslint-disable-next-line
                inputComponent={PercentageMask as any}
                style={{ width: 50, height: 35, background: 'rgba(151, 151, 151, 0.1)', marginLeft: 12 }}
                inputProps={{
                  style: { textAlign: 'center' }
                }}
              />
            </div>
            <div className="flex flex--align-center">
              <Typography variant="subtitle2" style={{ marginRight: 16, fontWeight: 'bold', width: 80  }}>
                2024 - Sell
              </Typography>
              <InputBase
                defaultValue="8"
                // eslint-disable-next-line
                inputComponent={PercentageMask as any}
                style={{ width: 50, height: 35, background: 'rgba(151, 151, 151, 0.1)', marginLeft: 12 }}
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

export default RetirementCard;
