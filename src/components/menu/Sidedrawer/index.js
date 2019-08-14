import React from 'react';
import PropTypes from 'prop-types';

/** Components */
import Item from './Item';

/** Models */
import { sidedrawerListModel } from '../../../utils/models';

const Sidedrawer = ({ list, onClickItem }) => (
  <div className="sidedrawer">
    <nav>
      <ul>
        {list.map(superhero => (
          <Item
            key={superhero.alias}
            superheroAlias={superhero.alias}
            superheroClass={superhero.class}
            superheroActive={superhero.active}
            superheroIndex={superhero.index}
            superheroIcon={superhero.icon}
            superheroIconMeasures={superhero.iconMeasures}
            onClickItem={onClickItem}
          />
        ))}
      </ul>
    </nav>
  </div>
);

Sidedrawer.propTypes = {
  list: sidedrawerListModel,
  onClickItem: PropTypes.func
};

export default Sidedrawer;