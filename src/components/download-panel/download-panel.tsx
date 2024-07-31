import { useContext } from 'react';
import { ThemeContext } from '../../context/theme-context';
import { unselectAll } from '../../store/personSelectedSlice';
import { useAppDispatch, useAppSelector } from '../../store/storeHooks';
import { DownLoadButton } from '../download-button/download-button';
import './download-panel.css';

export const DownLoadPanel: React.FC = () => {
  const theme = useContext(ThemeContext);
  const persons = useAppSelector((state) => state.selectedPersons.list);
  const dispatch = useAppDispatch();

  const text = `${persons.length} ${persons.length === 1 ? 'item is' : 'items are'} selected`;

  return (
    persons.length && (
      <div className={`${'download-panel'} ${theme}`}>
        <div className="download-container">
          {text}
          <div>
            <DownLoadButton />
            <button type="button" onClick={() => dispatch(unselectAll())}>
              unselect all
            </button>
          </div>
        </div>
      </div>
    )
  );
};
