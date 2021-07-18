import React from 'react';
import Badge from 'react-bootstrap/Badge'
import { DiceRollResponse } from '../../Interfaces/DiceRollResponse';
import styles from './DiceRollItem.module.css';

interface Props {
  roll: DiceRollResponse;
  isFirst: boolean;
}

const DiceRollItem: React.FunctionComponent<Props> = ({ roll, isFirst }: Props) => {
  const GetBadgeType = (dieFaces: number | string, roll: number) => {
    if (dieFaces === '%' && roll === 0) return 'danger';
    if (dieFaces === '%' && roll === 100) return 'success';
    if (dieFaces != '%' && roll === 1) return 'danger';
    if (dieFaces != '%' && roll === +dieFaces) return 'success';

    return 'light';
  };

  const GetTextType = (dieFaces: number | string, roll: number) => {
    if (dieFaces === '%' && (roll === 0 || roll === 100)) return 'light';
    if (dieFaces != '%' && (roll === 1 || roll === +dieFaces)) return 'light';

    return 'dark';
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
            .map((item: number, index: number) => (<>
              <Badge text={GetTextType(roll.faces, item)} bg={GetBadgeType(roll.faces, item)} className={`${styles['fixed-width-badge']} mr-1`}>{item}</Badge>
            </>
            ))}
        </td>
      </tr>
    </>
  );
};

export default DiceRollItem;
