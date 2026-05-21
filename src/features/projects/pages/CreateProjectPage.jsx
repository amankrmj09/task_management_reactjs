import CreateProjectForm from "../components/CreateProjectForm";

function CreateProjectPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Create Project
        </h1>

        <p className="mt-1 text-gray-500">
          Create a new project for your team
        </p>
      </div>

      <CreateProjectForm />
    </div>
  );
}

export default CreateProjectPage;