import React from 'react';
import { DiceRollResponse } from '../../Interfaces/DiceRollResponse';
import styles from './DiceRollItem.module.css';

interface Props {
  roll: DiceRollResponse;
  isFirst: boolean;
}

const DiceRollItem: React.FunctionComponent<Props> = ({ roll, isFirst }: Props) => {
  const GetBadgeType = (dieFaces: number | string, roll: number) => {
    if (dieFaces === '%') {
      if (roll === 0) {
        return 'badge-danger';
      }
    } else if (roll === 1) {
      return 'badge-danger';
    }

    if (dieFaces === '%') {
      if (roll === 100) {
        return 'badge-success';
      }
    } else if (roll === +dieFaces) {
      return 'badge-success';
    }

    return 'badge-light';
  };

  return (
    <>
      <tr className={isFirst ? 'table-info' : ''}>
        <th scope="row">{roll.id.substr(roll.id.length - 5).toUpperCase()}</th>
        <td>{roll.name}</td>
        <td>
          {roll.die}
          d
          {roll.faces}
        </td>
        <td className="w-50">
          {roll.roll
            .sort((n1, n2) => n2 - n1)
            .map((item: number, index: number) => (
              <span key={`${roll.id}_${index}`}
                className={`badge ${styles['fixed-width-badge']} mr-1 ${GetBadgeType(roll.faces, item)}`}
              >
                {item}
              </span>
            ))}
        </td>
      </tr>
    </>
  );
};

export default DiceRollItem;
