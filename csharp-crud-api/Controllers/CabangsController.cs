using Data;
using Microsoft.AspNetCore.Mvc;
using Models;
using Microsoft.EntityFrameworkCore;

namespace csharp_crud_api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CabangsController : ControllerBase
{
    private readonly CabangContext _context;

    public CabangsController(CabangContext context)
    {
        _context = context;
    }

    // GET: api/cabangs
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Cabang>>> GetCabangs()
    {
        return await _context.Cabangs.ToListAsync();
    }

    [Route("CabangData")]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Cabang>>> CabangData(string? search)
    {
        bool b1 = string.IsNullOrEmpty(search);
        if (!b1)
        {
            return await _context.Cabangs
                .FromSqlRaw(
                    $"Select * From cabang where nama_cabang like '%{search}%' order by Id desc"
                )
                .OrderByDescending(x => x.Id)
                .AsNoTracking()
                .ToListAsync();
        }
        else
        {
            return await _context.Cabangs
                .FromSqlRaw($"Select * From cabang order by Id desc")
                .OrderByDescending(x => x.Id)
                .AsNoTracking()
                .ToListAsync();
        }
    }

    // GET: api/cabangs/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Cabang>> GetCabang(int id)
    {
        var cabang = await _context.Cabangs.FindAsync(id);

        if (cabang == null)
        {
            return NotFound();
        }

        return cabang;
    }

    // POST api/cabangs
    [HttpPost]
    public async Task<ActionResult<Cabang>> PostCabang(Cabang cabang)
    {
        _context.Cabangs.Add(cabang);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetCabang), new { id = cabang.Id }, cabang);
    }

    // PUT api/cabangs/5
    [HttpPut("{id}")]
    public async Task<ActionResult<Cabang>> PutCabang(int id, Cabang cabang)
    {
        if (id != cabang.Id)
        {
            return BadRequest();
        }

        _context.Entry(cabang).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        var cabangData = await _context.Cabangs.FindAsync(id);

        if (cabangData == null)
        {
            return NotFound();
        }

        return cabangData;
    }

    // DELETE api/cabangs/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCabang(int id)
    {
        var cabang = await _context.Cabangs.FindAsync(id);

        if (cabang == null)
        {
            return NotFound();
        }

        _context.Cabangs.Remove(cabang);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // dummy endpoint to test the database connection
    [HttpGet("test")]
    public string Test()
    {
        return "Hello World!";
    }
}
