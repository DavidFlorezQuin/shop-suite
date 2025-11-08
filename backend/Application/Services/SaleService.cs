using Application.Interfaces;
using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Services
{
    public class SaleService
    {
        private readonly ISaleRepository _repository;

        public SaleService(ISaleRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Sale>> GetAllAsync() => await _repository.GetAllAsync();
        public async Task<Sale> GetByIdAsync(int id) => await _repository.GetByIdAsync(id);
        public async Task<Sale> CreateAsync(Sale sale) => await _repository.CreateAsync(sale);
    }
}

