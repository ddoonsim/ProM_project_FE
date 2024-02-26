import MemberOnly from '../../../components/authority/MemberOnly';
import EditInfoContainer from '../../../containers/project/EditInfoContainer';
import NewProjectContainer from '../../../containers/project/NewProjectContainer';

const NewProject = ({mode}) => {

  return (
    <MemberOnly>
      <div>
        {mode === 'new' ? (<NewProjectContainer />) : (<EditInfoContainer />)}
        
      </div>
    </MemberOnly>
  );
};

export default NewProject;
