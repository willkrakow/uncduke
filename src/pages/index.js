import React from 'react'
import './index.css';
import { GatsbyImage } from 'gatsby-plugin-image'
import { graphql } from 'gatsby';
import { useLocalStorage } from 'react-use'


const isBrowser = typeof window !== 'undefined'

const Index = ({ data }) => {
  const { edges } = data.allImageSharp;
  const [hovered, setHovered] = React.useState();
  const [value, setValue] = useLocalStorage('_unckansaswtkvoted', false);
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (choice) => {
    setLoading(true);
    if (value) {
      setLoading(false);
      return;
    }
    try {
      await fetch('/api/poll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          choice
        })
      });
      setValue(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  React.useEffect(() => {
    const getResults = async () => {
      setLoading(true);
      try {
        const data = await fetch('/api/poll');
        const rawResults = await data.json();
        const formattedResults = rawResults.map((result) => ({
          ...result.fields,
        }))
        setResults(formattedResults);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getResults();
  }, []);

  const resultStats = React.useMemo(() => {
    const stats = results.reduce((acc, result) => {
      if (!acc[result.choice]) {
        acc[result.choice] = 0;
      }
      acc[result.choice]++;
      return acc;
    }, {})
    return stats;
  }, [results])

  if (!isBrowser) return null;
  return (
    <div>
      <div className="wrapper">
        <div className="teamimage">
          <GatsbyImage imgClassName={`teamimageimage ${hovered === "UNC" ? null : "hidden"}`} image={edges.find(e => e.node.parent.absolutePath.includes("UNC.png")).node.gatsbyImageData} alt="UNC" />
        </div>
        <div className="teamimage">
          <GatsbyImage imgClassName={`teamimageimage ${hovered === "KU" ? null : "hidden"}`} image={edges.find(e => e.node.parent.absolutePath.includes("KU.png")).node.gatsbyImageData} alt="KU" className={`${hovered === "KU" ? null : "hidden"}`} />
        </div>
        <h3 className="title">Who's gonna win tonight?</h3>
        {value ? (
          <section className="results">
            <h2>Results</h2>
            {loading ? <div className="loading">Loading...</div> : null}
            <div className="resultwrapper">
              {Object.keys(resultStats).map((choice) => (
                <article key={choice} className="result">
                  <h3 className="result-choice">{choice}</h3>
                  <div className={`result-count ${choice.toLocaleLowerCase()}-results`} style={{
                    height: `${resultStats[choice] / results.length * 100}px`
                  }}>{resultStats[choice]}</div>
                </article>
              ))}
            </div>
          </section>
        ) : (
            <section>
              <div className="buttonwrapper">
                <button
                  className="team unc"
                  id="unc"
                  onClick={() => handleSubmit("UNC")}
                  onFocus={() => setHovered("UNC")}
                  onMouseOver={() => setHovered("UNC")}
                  onMouseEnter={() => setHovered("UNC")}
                  onMouseLeave={() => setHovered(null)}>
                  North Carolina
                </button>
                <button
                  className="team kansas"
                  id="kansas"
                  onClick={() => handleSubmit("Kansas")}
                  onMouseOver={() => setHovered("KU")}
                  onFocus={() => setHovered("KU")}
                  onMouseEnter={() => setHovered("KU")}
                  onMouseLeave={() => setHovered(null)}>
                  Kansas
                </button>
              </div>
            </section>
        )}
      </div>
    </div>

  )
}

export default Index;

export const query = graphql`
  {
    allImageSharp {
      edges {
        node {
          gatsbyImageData(width: 1000, layout: CONSTRAINED)
          parent {
            ... on File {
              id
              name
              absolutePath
            }
          }
        }
      }
    }
  }
`