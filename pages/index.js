// import { AmplifyAuthenticator, withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import Head from "next/head";
// import { useEffect } from "react";
// import { createTask } from "../src/graphql/mutations";
// import { listTasks } from "../src/graphql/queries";
import styles from "./../styles/Home.module.css";

// Comment/Uncomment to compare page load times
import { Amplify, API, Auth, withSSRContext } from "aws-amplify";
import awsExports from "../src/aws-exports";

Amplify.configure({ ...awsExports, ssr: true });

export async function getServerSideProps({ req }) {
  return {
    props: {
      tasks: [{ id: 1, title: "test", description: "test" }],
    },
  };
}

async function handleCreateTask(event) {
  event.preventDefault();
}

const Home = ({ tasks = [] }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Amplify + Next.js</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Amplify + Next.js</h1>

        <p className={styles.description}>
          <code className={styles.code}>{tasks.length}</code>
          tasks
        </p>

        <div className={styles.grid}>
          {tasks.map((task) => (
            <a className={styles.card} href={`/tasks/${task.id}`} key={task.id}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
            </a>
          ))}

          <div className={styles.card}>
            <h3 className={styles.title}>New Task</h3>

            {/* <AmplifyAuthenticator> */}
            <form onSubmit={handleCreateTask}>
              <fieldset>
                <legend>Title</legend>
                <input
                  defaultValue={`Today, ${new Date().toLocaleTimeString()}`}
                  name="title"
                />
              </fieldset>

              <fieldset>
                <legend>description</legend>
                <textarea
                  defaultValue="I built an Amplify app with Next.js!"
                  name="description"
                />
              </fieldset>

              <button>Create Task</button>
              <button type="button">Sign out</button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
