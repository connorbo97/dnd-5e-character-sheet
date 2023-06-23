import { ProficiencyButton } from './ProficiencyButton';

export const BooleanButton = ({ value, onToggle, ...rest }) => {
  return (
    <ProficiencyButton
      config={{ proficient: value }}
      onToggle={onToggle}
      {...rest}
    />
  );
};
