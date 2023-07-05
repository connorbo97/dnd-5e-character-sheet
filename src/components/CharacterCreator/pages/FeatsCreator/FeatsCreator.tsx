import { fill, get, identity } from 'lodash';
import styles from './featsCreator.module.scss';
import { FEAT_CONFIGS, FEAT_OPTIONS } from 'constants/feats';
import { InnerHtmlElement } from 'common/components/InnerHtmlElement/InnerHtmlElement';
import {
  useCharacterCreatorPath,
  useCharacterCreatorSheet,
} from 'providers/CharacterCreatorProvider';
import { Dropdown } from 'common/components/Dropdown/Dropdown';
import { iSet } from 'utils/lodashUtils';
import { RequiredIcon } from 'common/components/RequiredIcon/RequiredIcon';
import { CHARACTER_CREATOR_PATHS } from 'constants/characterCreator';

type Props = any;
export const FeatsCreator = (props: Props) => {
  const { featChoices } = useCharacterCreatorSheet();

  const [feats, , updateFeats] = useCharacterCreatorPath(
    CHARACTER_CREATOR_PATHS['feats'],
  );
  const featPlaceholder = fill(Array(featChoices || 0), null);

  console.log(feats);
  return (
    <div className={styles['container']}>
      <h1>Feats</h1>
      {!featChoices && <p>No feats to choose</p>}
      {!!featChoices && (
        <div>
          {featPlaceholder.map((_, i) => {
            const featValue = get(feats, [i, 'value']);
            const featConfig = FEAT_CONFIGS[featValue];
            return (
              <div key={i}>
                <h3>
                  Pick a feat <RequiredIcon />
                </h3>
                <Dropdown
                  options={FEAT_OPTIONS}
                  value={featValue}
                  placeholder="Choose"
                  disabledValues={feats
                    .filter(identity)
                    .map(({ value }) => value)}
                  onChange={(e) =>
                    updateFeats((prev) =>
                      iSet(prev, [i, 'value'], e.target.value),
                    )
                  }
                />
                {featValue && featConfig && (
                  <>
                    <h4>{featConfig.label}</h4>
                    <InnerHtmlElement html={featConfig.description} />
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
