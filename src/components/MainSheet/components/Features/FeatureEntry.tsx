import { CollapsibleCard } from 'common/components/CollapsibleCard/CollapsibleCard';
import styles from './featureEntry.module.scss';
import { FeatureConfig } from 'constants/features';
import { useRef } from 'react';
import { ScrollToTop } from 'common/components/ScrollToTop/ScrollToTop';

type Props = {
  index: number;
  feature: FeatureConfig;
};

export const FeatureEntry = ({ index, feature }: Props) => {
  const containerRef: any = useRef();
  const { label, source, sourceLabel, description } = feature;
  return (
    <div className={styles['container']} ref={containerRef}>
      <CollapsibleCard
        header={
          <div className={styles['header']}>
            <span className={styles['label']}>{label}</span>
            <span className={styles['sub-label']}>
              {source}: {sourceLabel}
            </span>
          </div>
        }
        transitionTime={100}
        contentClassName={styles['content']}>
        <div className={styles['description']}>{description}</div>
        <ScrollToTop targetRef={containerRef} />
      </CollapsibleCard>
    </div>
  );
};
