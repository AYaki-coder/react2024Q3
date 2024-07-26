import { unselectAll } from '../../store/personSelectedSlice';
import { useAppDispatch, useAppSelector } from '../../store/storeHooks';
import { DownLoadButton } from '../download-button/download-button';
import './download-panel.css';

export const DownLoadPanel: React.FC = () => {
  const persons = useAppSelector((state) => state.persons.list);
  const dispatch = useAppDispatch();

  const text = `${persons.length} ${persons.length === 1 ? 'item is' : 'items are'} selected`;

  return (
    persons.length && (
      <div className="download-panel">
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
