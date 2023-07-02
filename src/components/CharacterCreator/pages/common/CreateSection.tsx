import { get, stubTrue } from 'lodash';
import { StaticSection } from './StaticSection';
import { ChoiceSection } from './ChoiceSection';
import { SECTION_CONFIG_TYPE } from 'constants/characterCreatorSections';

type Props = any;
export const CreateSection = ({
  config,
  getUpdatePath = (i) => i,
  onUpdate,
}: Props) => {
  if (!config?.length) {
    return null;
  }

  return config.map((curConfig, index) => {
    const shouldRender = get(curConfig, 'choiceCondition', stubTrue)(config);

    if (!shouldRender) {
      return null;
    }

    const Component =
      curConfig.type === SECTION_CONFIG_TYPE.STATIC
        ? StaticSection
        : ChoiceSection;
    return (
      <Component
        key={index}
        {...curConfig}
        updatePath={getUpdatePath(index)}
        onUpdate={onUpdate}
      />
    );
  });
};
