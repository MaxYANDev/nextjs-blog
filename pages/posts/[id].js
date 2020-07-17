import Layout from '../../components/layout'
import {getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyled from '../../styles/utils.module.css'

export default function Post({postData}) {
  return (
    <Layout>
      <Head>
        <title>
          { postData.title }
        </title>
      </Head>
      <article>
        <h1 className={utilStyled.headingXl}>
          {postData.title}
        </h1>
        <br/>
        <div className={utilStyled.lightText}>
          {postData.id}
        </div>
        <br/>
        <div className={utilStyled.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{__html: postData.contentHtml}} />
      </article>
      
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}