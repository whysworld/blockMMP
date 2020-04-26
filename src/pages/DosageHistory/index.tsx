import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
//react material
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Page from '../../components/Page'
import Icon from '../../components/Icon'
import {
  Header,
  Section
} from './styles'
import { store } from '../../components/Provider'
import { IDosageHistoryData } from '../../models'
import { urls } from '../../routing'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export interface tableDataModel {
  site_id: string,
  client_id: string,
  timestamp: string,
  dose_mg: number
}
const DosageHistory: React.FC = () => {
  const classes = useStyles();
  const { push } = useHistory()
  const [dosageHistory, setDosageHistory] = useState(
    [
      {
        site_id: '',
        client_id: '',
        timestamp: '',
        dose_mg: -1
      }
    ]
  )

  const setData = (data: IDosageHistoryData): void => {
    const tableData = data.doses.map(item => ({
      site_id: data.site_id,
      client_id: data.client_id,
      timestamp: item.timestamp,
      dose_mg: item.dose_mg
    }))
    setDosageHistory(tableData)
  }

  useEffect(() => {
    const dosageData: IDosageHistoryData | null = store.getState().dosageHistory.data;
    if (dosageData === null)
      push(urls.filter)
    else {
      setData(dosageData)
    }
  }, [])
  return (
    <Page style={{ backgroundColor: 'white', display: 'block' }}>
      <Header style={{ backgroundColor: 'rgb(41,51,114)', textAlign: 'center' }}>
        <Icon style={{ height: 200 }} icon="logo.png" className="logo" />
      </Header>
      <Section style={{ marginTop: 50 }}>
        <TableContainer component={Paper} >
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>site_ID</StyledTableCell>
                <StyledTableCell align="right">client_ID</StyledTableCell>
                <StyledTableCell align="right">timestamp</StyledTableCell>
                <StyledTableCell align="right">dose_mg</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dosageHistory.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {row.site_id}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.client_id}</StyledTableCell>
                  <StyledTableCell align="right">{row.timestamp}</StyledTableCell>
                  <StyledTableCell align="right">{row.dose_mg}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Section>

    </Page>
  )
}
export default DosageHistory
