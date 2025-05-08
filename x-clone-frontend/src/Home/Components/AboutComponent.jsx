import { SearchBarComponent } from './SearchBarComponent';
import { TrendComponent } from './TrendComponent';

export const AboutComponent = () => {
  return (
    <>
      <div className="flex flex-col w-[350px] justify-items-center">
        <SearchBarComponent />
        <TrendComponent
          Header="Ricardo Melo Sizas"
          Title="#ParoCamionero"
          Information="Trending With"
          trends="ACPM, #ParoNacional"
        />
        <TrendComponent
          Header="Thomas Parker Melo Sizas"
          Title="Rodolfo Hernández"
          Information="Trending With"
          trends="Marelen Castillo"
        />
        <TrendComponent
          Header="Juan Caballo Melo Sizas"
          Title="Calle 80"
          Information="3,379 posts"
          trends=""
        />
      </div>
    </>
  );
};
