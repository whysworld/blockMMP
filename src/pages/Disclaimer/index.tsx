import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
//react material
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '@material-ui/lab/Alert';

import { urls } from '../../routing'
import Page from '../../components/Page'
import {
  Section,
  Title,
  Subtitle,
  Content,
  Article,
  Highlight
} from './styles'
const Disclaimer: React.FC = () => {
  const { push } = useHistory()

  const [acceptance, setAcceptance] = useState(false)
  const [open, setOpen] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAcceptance(!acceptance)
    console.log(acceptance)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleProceed = () => {
    if (acceptance) {
      localStorage.setItem("didTCAccepted", 'yes')
      push(urls.filter)
    }
    else {
      setOpen(true)
    }
  };
  return (
    <Page style={{ backgroundColor: 'white' }}>
      <Section>
        <Title>Disclaimer</Title>
        <Subtitle>42 CFR Part 2 - Statutory authority for confidentiality of substance use disorder patient records.</Subtitle>
        <Content>
          <Article>
            2.1 - Statutory authority for confidentiality of substance use disorder patient records.<br></br>
          Title 42, United States Code, Section 290dd-2(g) authorizes the Secretary to prescribe regulations. Such regulations may contain such definitions, and may provide for such safeguards and procedures, including procedures and criteria for the issuance and scope of orders, as in the judgment of the Secretary are necessary or proper to effectuate the purposes of this statute, to prevent circumvention or evasion thereof, or to facilitate compliance therewith.
          </Article>
          <Article>
            § 2.2 Purpose and effect.<br></br>
            (a) Purpose. Pursuant to 42 U.S.C. 290dd-2(g), the regulations in this part impose restrictions upon the disclosure and use of substance use disorder patient records which are maintained in connection with the performance of any part 2 program. The regulations in this part include the following subparts:<br></br><br></br>
            (1) Subpart B of this part: General Provisions, including definitions, applicability, and general restrictions;<br></br><br></br>
            (2) Subpart C of this part: Disclosures with Patient Consent, including disclosures which require patient consent and the consent form requirements;<br></br><br></br>
            (3) Subpart D of this part: Disclosures without Patient Consent, including disclosures which do not require patient consent or an authorizing court order; and
          </Article>
          <Highlight>
            If this is an emergency situation
          </Highlight>
          <FormControlLabel
            control={<Checkbox color="primary" checked={acceptance} onChange={handleChange} name="acceptance" />}
            label="I agree to the above disclaimer"
          />
          <div>
            <p>By clicking the above, you agree to all terms and conditions as per the above disclaimer</p>
            <p>An email alert with login information will be sent to the patient's primary clinic</p>
          </div>
          <Button onClick={handleProceed} style={{ marginTop: 40 }} variant="contained" color="primary">
            Proceed
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title"><Alert style={{ justifyContent: 'center', textTransform: 'uppercase' }} severity="error">Warning!</Alert></DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Please check "I agree to the above disclaimer"
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Content>
      </Section>

    </Page>
  )
}

export default Disclaimer
