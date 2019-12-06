import React, { ChangeEvent } from 'react'
import { TextField, Grid } from '@material-ui/core'

export interface Props {
  label: string
  type: string
  name: string
  icon: (props: any) => JSX.Element
  handleChange: (e: ChangeEvent<any>) => void
  handleBlur: (e: ChangeEvent<any>) => void
}

const TextFieldWithIcon: React.FC<Props> = props => {
  const [values] = React.useState<Props>(props)

  return (
    <Grid container alignItems='flex-end'>
      <Grid item xs={1}>
        <values.icon />
      </Grid>
      <Grid item xs={11}>
        <TextField
          label={values.label}
          type={values.type}
          name={values.name}
          fullWidth={true}
          onChange={values.handleChange}
          onBlur={values.handleBlur}
        />
      </Grid>
    </Grid>
  )
}

export default TextFieldWithIcon
