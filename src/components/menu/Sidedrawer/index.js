import React from 'react';
import PropTypes from 'prop-types';

/** Components */
import Item from './Item';

/** Models */
import { superheroesModel } from '../../../utils/models';

const Sidedrawer = ({ superheroes, onClickItem }) => (
  <div className="sidedrawer">
    <nav>
      <ul>
        {superheroes.map(superhero => (
          <Item
            key={superhero.name}
            superheroName={superhero.name}
            superheroClass={superhero.class}
            superheroActive={superhero.active}
            superheroIndex={superhero.index}
            superheroIcon={superhero.icon}
            superheroIconMeasurements={superhero.iconMeasurements}
            onClickItem={onClickItem}
          />
        ))}
      </ul>
    </nav>
  </div>
);

Sidedrawer.propTypes = {
  superheroes: superheroesModel,
  onClickItem: PropTypes.func,
};

export default Sidedrawer;
