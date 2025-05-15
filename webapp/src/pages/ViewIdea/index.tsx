import { useParams } from 'react-router-dom';

const ViewIdeaPage = () => {
  const { ideaNick } = useParams() as { ideaNick: string };

  return (
    <div>
      <h1>{ideaNick}</h1>
      <p>description</p>
      <div>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium
          autem doloremque, eaque eius excepturi explicabo ipsum libero nisi
          odit recusandae. Commodi, explicabo perferendis! Aspernatur facilis
          maxime quisquam quo rem temporibus?
        </div>
        <div>
          Alias consequatur, dolore eaque et quas rerum tenetur voluptatibus.
          Accusamus beatae consequatur corporis delectus dignissimos explicabo
          facere incidunt pariatur quaerat recusandae. Aut ducimus eos et, fuga
          in pariatur ratione rem!
        </div>
        <div>
          Ab deleniti, dolore earum enim et exercitationem quasi velit!
          Assumenda, dolorem et nam nihil ratione saepe sequi. Ab accusantium
          aliquam animi aspernatur blanditiis commodi dolores, eos, iste, modi
          neque possimus.
        </div>
        <div>
          Alias asperiores aspernatur distinctio incidunt ipsa minus mollitia
          nam, necessitatibus, neque nisi obcaecati officia omnis perspiciatis
          praesentium quia quibusdam quod reprehenderit rerum sit tenetur unde
          velit vitae voluptas? Ratione, unde.
        </div>
      </div>
    </div>
  );
};

export default ViewIdeaPage;
