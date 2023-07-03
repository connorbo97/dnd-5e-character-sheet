import { get, stubFalse, stubTrue } from 'lodash';
import { StaticSection } from './StaticSection';
import { ChoiceSection } from './ChoiceSection';
import {
  SECTION_CONFIG_FORMAT,
  SECTION_CONFIG_TYPE,
} from 'constants/characterCreatorSections';
import styles from './createSection.module.scss';
import classnames from 'classnames/bind';

const classNameBuilder = classnames.bind(styles);

const HIDDEN_BORDER_FORMATS = new Set([
  SECTION_CONFIG_FORMAT.EQUIPMENT,
  SECTION_CONFIG_FORMAT.PROFICIENCY_CLASS,
]);

type Props = any;
export const CreateSection = ({
  config,
  getUpdatePath = (i) => i,
  onUpdate,
  shouldDisableBorder = stubFalse,
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

    const hideBorder =
      HIDDEN_BORDER_FORMATS.has(curConfig?.format) ||
      shouldDisableBorder?.(index);
    return (
      <div
        key={index}
        className={classNameBuilder('container', {
          'hide-border': hideBorder,
        })}>
        <Component
          {...curConfig}
          updatePath={getUpdatePath(index)}
          onUpdate={onUpdate}
        />
      </div>
    );
  });
};