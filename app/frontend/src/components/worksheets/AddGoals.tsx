import * as React from 'react';
import MuiButton from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useRecoilState, useSetRecoilState} from "recoil";
import {
  addGoalsDialogOpen,
  buySharesDialogActive,
  employmentDialogActive,
  profitDialogActive,
  retirementDialogActive,
  sellSharesDialogActive
} from "../../store/Atoms";
import Button from "../Button";

interface AddGoalsTypes {
  business: BusinessRowProps | null
}

function AddGoals({ business }: AddGoalsTypes): JSX.Element | null {
  const [open, setOpen] = useRecoilState(addGoalsDialogOpen);
  const setEmpOpen = useSetRecoilState(employmentDialogActive);
  const setRetOpen = useSetRecoilState(retirementDialogActive);
  const setProfitOpen = useSetRecoilState(profitDialogActive);
  const setSellSharesOpen = useSetRecoilState(sellSharesDialogActive);
  const setBuySharesOpen = useSetRecoilState(buySharesDialogActive);

  if (!business) return null;

  return (
    <Dialog fullWidth maxWidth="lg" open={open} onClose={() => setOpen(!open)}>
      <DialogTitle style={{ textAlign: 'center', paddingBottom: 0 }}>
        Add Goals for {business.name}
      </DialogTitle>
      <DialogContent style={{ textAlign: 'center', paddingBottom: 24 }}>
        <DialogContentText style={{ paddingBottom: 16 }}>
          Select Goals and Enter Data
        </DialogContentText>
        <Button
          style={{ marginRight: 12 }}
          label="Employed by Business"
          onClick={() => {
            setOpen(!open);
            setEmpOpen(true);
          }} />
        <Button
          style={{ marginRight: 12 }}
          label="Retirement Plan"
          onClick={() => {
            setOpen(!open);
            setRetOpen(true);
          }}
        />
        <Button
          style={{ marginRight: 12 }}
          label="Profit Distributions"
          onClick={() => {
            setOpen(!open);
            setProfitOpen(true);
          }}
        />
        <Button
          style={{ marginRight: 12 }}
          label="Buy More Shares"
          onClick={() => {
            setOpen(!open);
            setBuySharesOpen(true);
          }}
        />
        <Button
          style={{ marginRight: 12 }}
          label="Sell Shares"
          onClick={() => {
            setOpen(!open);
            setSellSharesOpen(true);
          }}
        />
      </DialogContent>
      <DialogActions>
        <MuiButton onClick={() => setOpen(false)} color="primary" variant="outlined">
          Close
        </MuiButton>
      </DialogActions>
    </Dialog>
  );
}

export default AddGoals;
