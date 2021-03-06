import React from "react";
import PropTypes from "prop-types";

import Chip from "material-ui/Chip";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import Toggle from "material-ui/Toggle";

import { TextRequestType } from "../../api/organization";

const AssignmentRow = props => {
  const { assignmentPool, isRowDisabled, onChange } = props;
  const {
    title,
    textColor,
    backgroundColor,
    isAssignmentEnabled,
    assignmentType,
    maxRequestCount
  } = assignmentPool;

  const handleToggleIsEnabled = (_event, isAssignmentEnabled) =>
    onChange({ isAssignmentEnabled });

  const handleChangeAssignmentType = (_event, _index, assignmentType) =>
    onChange({ assignmentType });

  const handleChangeMaxCount = (_event, maxRequestCount) =>
    onChange({ maxRequestCount: parseInt(maxRequestCount, 10) });

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{ minWidth: "200px" }}>
        <Chip
          style={{ display: "inline-block" }}
          labelColor={textColor}
          backgroundColor={backgroundColor}
        >
          {title}
        </Chip>
      </div>
      <div>
        <Toggle
          label="Enable assignment?"
          labelPosition="right"
          toggled={isAssignmentEnabled}
          disabled={isRowDisabled}
          style={{ display: "inline-block" }}
          onToggle={handleToggleIsEnabled}
        />
      </div>
      <div style={{ flex: 1 }} />
      <SelectField
        style={{ marginLeft: "20px" }}
        floatingLabelText="Assignment Type"
        value={assignmentType}
        disabled={isRowDisabled || !isAssignmentEnabled}
        onChange={handleChangeAssignmentType}
      >
        <MenuItem
          value={TextRequestType.UNSENT}
          primaryText="Unsent Initial Messages"
        />
        <MenuItem
          value={TextRequestType.UNREPLIED}
          primaryText="Unhandled Replies"
        />
      </SelectField>
      <TextField
        style={{ marginLeft: "10px" }}
        floatingLabelText="Max to request at once"
        type="number"
        value={maxRequestCount}
        disabled={isRowDisabled || !isAssignmentEnabled}
        onChange={handleChangeMaxCount}
      />
    </div>
  );
};

AssignmentRow.defaultProps = {
  isRowDisabled: false
};

AssignmentRow.propTypes = {
  assignmentPool: PropTypes.shape({
    title: PropTypes.string.isRequired,
    textColor: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    isAssignmentEnabled: PropTypes.bool.isRequired,
    assignmentType: PropTypes.string.isRequired,
    maxRequestCount: PropTypes.number.isRequired
  }).isRequired,
  isRowDisabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

export default AssignmentRow;
