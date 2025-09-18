import HeroSection from '@/components/heroSection'
import JoinUs from '@/components/joinUs'
import VideoSection from '@/components/videoSection'
import GrowSkills from '@/components/growskills'
import PopularCourse from '@/components/popularCourse'
import BestSellingCourse from '@/components/bestSellingCourse'
import NewCategory from '@/components/newCategory'
import BestRatedCourse from '@/components/bestRatedCourse'
import ChooseUs from '@/components/chooseUs'
import PopularSliderCourse from '@/components/popularSliderCourse'
import Instructor from '@/components/instructor'
import FreeCourse from '@/components/freeCourse'
import Testimonial from '@/components/testimonial'
import StatesCounter from '@/components/statesCounter'
import JoinNewsLetter from '@/components/joinNewsLetter'
import MostPopularPost from '@/components/mostPopularPost'
import AdmissionMessage from '@/components/admissionMessage'

const HomePage: React.FC = () => {
  return (
    <div className="homepage">
      <HeroSection />
      <GrowSkills></GrowSkills>
      <BestSellingCourse></BestSellingCourse>
      <VideoSection></VideoSection>
      <PopularCourse></PopularCourse>
      <NewCategory></NewCategory>
      {/* <Category /> */}
      <BestRatedCourse></BestRatedCourse>
      <ChooseUs></ChooseUs>
      <PopularSliderCourse></PopularSliderCourse>
      <JoinUs></JoinUs>
      <Instructor></Instructor>
      <FreeCourse></FreeCourse>
      <StatesCounter></StatesCounter>
      <Testimonial></Testimonial>
      <AdmissionMessage></AdmissionMessage>
      <JoinNewsLetter></JoinNewsLetter>
      <MostPopularPost></MostPopularPost>
    </div>
  )
}

export default HomePage
