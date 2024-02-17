import MemberOnly from '../../../components/authority/MemberOnly';
import NewProjectContainer from '../../../containers/project/NewProjectContainer';

const NewProject = () => {

  return (
    <MemberOnly>
      <div>
        <NewProjectContainer />
      </div>
    </MemberOnly>
  );
};

export default NewProject;
